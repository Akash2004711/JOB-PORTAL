import { supabase } from '../lib/supabase';

export const recruitmentService = {
  // Jobs Management
  async getJobs(filters = {}) {
    try {
      let query = supabase?.from('jobs')?.select(`
          *,
          company:companies(name, logo_url),
          created_by_profile:user_profiles!jobs_created_by_fkey(full_name),
          applications_count:applications(count)
        `)?.order('created_at', { ascending: false });

      // Apply filters
      if (filters?.status) {
        query = query?.eq('status', filters?.status);
      }
      if (filters?.department) {
        query = query?.eq('department', filters?.department);
      }
      if (filters?.priority) {
        query = query?.eq('priority', filters?.priority);
      }

      const { data, error } = await query;
      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getJobById(jobId) {
    try {
      const { data, error } = await supabase?.from('jobs')?.select(`
          *,
          company:companies(*),
          created_by_profile:user_profiles!jobs_created_by_fkey(*),
          applications(
            *,
            candidate:candidates(*),
            hiring_stages(*)
          )
        `)?.eq('id', jobId)?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async createJob(jobData) {
    try {
      const { data, error } = await supabase?.from('jobs')?.insert([jobData])?.select()?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async updateJob(jobId, updates) {
    try {
      const { data, error } = await supabase?.from('jobs')?.update(updates)?.eq('id', jobId)?.select()?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Applications Management
  async getApplications(filters = {}) {
    try {
      let query = supabase?.from('applications')?.select(`
          *,
          job:jobs(title, department, company:companies(name)),
          candidate:candidates(*),
          assigned_recruiter_profile:user_profiles!applications_assigned_recruiter_fkey(full_name),
          hiring_stages(*)
        `)?.order('created_at', { ascending: false });

      if (filters?.status) {
        query = query?.eq('status', filters?.status);
      }
      if (filters?.jobId) {
        query = query?.eq('job_id', filters?.jobId);
      }
      if (filters?.recruiterId) {
        query = query?.eq('assigned_recruiter', filters?.recruiterId);
      }

      const { data, error } = await query;
      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async updateApplicationStatus(applicationId, status, notes = null) {
    try {
      const { data, error } = await supabase?.from('applications')?.update({ 
          status,
          ...(notes && { notes })
        })?.eq('id', applicationId)?.select()?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Candidates Management
  async getCandidates(filters = {}) {
    try {
      let query = supabase?.from('candidates')?.select(`
          *,
          applications(
            *,
            job:jobs(title, company:companies(name))
          )
        `)?.order('created_at', { ascending: false });

      if (filters?.skills && filters?.skills?.length > 0) {
        query = query?.overlaps('skills', filters?.skills);
      }
      if (filters?.experienceMin) {
        query = query?.gte('experience_years', filters?.experienceMin);
      }

      const { data, error } = await query;
      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async createCandidate(candidateData) {
    try {
      const { data, error } = await supabase?.from('candidates')?.insert([candidateData])?.select()?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Recruitment Metrics
  async getRecruitmentMetrics(filters = {}) {
    try {
      let query = supabase?.from('recruitment_metrics')?.select(`
          *,
          job:jobs(title, department),
          recruiter:user_profiles!recruitment_metrics_recruiter_id_fkey(full_name)
        `)?.order('metric_date', { ascending: false });

      if (filters?.dateFrom) {
        query = query?.gte('metric_date', filters?.dateFrom);
      }
      if (filters?.dateTo) {
        query = query?.lte('metric_date', filters?.dateTo);
      }
      if (filters?.recruiterId) {
        query = query?.eq('recruiter_id', filters?.recruiterId);
      }

      const { data, error } = await query;
      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Daily Analytics
  async getDailyAnalytics(dateRange = 7) {
    try {
      const startDate = new Date();
      startDate?.setDate(startDate?.getDate() - dateRange);

      const { data, error } = await supabase?.from('daily_analytics')?.select('*')?.gte('date', startDate?.toISOString()?.split('T')?.[0])?.order('date', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Recruiter Performance
  async getRecruiterPerformance(filters = {}) {
    try {
      let query = supabase?.from('recruiter_performance')?.select(`
          *,
          recruiter:user_profiles!recruiter_performance_recruiter_id_fkey(full_name, department)
        `)?.order('metric_period', { ascending: false });

      if (filters?.period) {
        query = query?.eq('metric_period', filters?.period);
      }
      if (filters?.recruiterId) {
        query = query?.eq('recruiter_id', filters?.recruiterId);
      }

      const { data, error } = await query;
      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Real-time subscriptions
  subscribeToJobUpdates(callback) {
    return supabase?.channel('jobs_changes')?.on('postgres_changes', 
        { event: '*', schema: 'public', table: 'jobs' },
        callback
      )?.subscribe();
  },

  subscribeToApplicationUpdates(callback) {
    return supabase?.channel('applications_changes')?.on('postgres_changes',
        { event: '*', schema: 'public', table: 'applications' },
        callback
      )?.subscribe();
  },

  // Utility functions
  async getCompanies() {
    try {
      const { data, error } = await supabase?.from('companies')?.select('*')?.eq('is_active', true)?.order('name');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getUserProfiles(role = null) {
    try {
      let query = supabase?.from('user_profiles')?.select('*')?.eq('is_active', true)?.order('full_name');

      if (role) {
        query = query?.eq('role', role);
      }

      const { data, error } = await query;
      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
};