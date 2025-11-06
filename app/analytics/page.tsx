'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { setLoading as setAnalyticsLoading, setData, setError } from '@/redux/slices/analytics';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { analyticsAPI } from '@/services/api';
import { toast } from 'sonner';

export default function AnalyticsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    const fetchAnalytics = async () => {
      dispatch(setAnalyticsLoading(true));
      try {
        const response = await analyticsAPI.getDashboard();
        dispatch(setData(response.data.data));
      } catch (err: any) {
        toast.error('Failed to fetch analytics');
        dispatch(setError(err.response?.data?.error || 'Failed to fetch analytics'));
      } finally {
        dispatch(setAnalyticsLoading(false));
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error || 'Failed to load analytics'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
      <AnalyticsDashboard data={data} />
    </div>
  );
}