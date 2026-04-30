import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Trophy,
  Star,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const formatRupiah = (value) => {
  const amount = Number(value || 0);
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

const mockData = {
  totalRevenue: 178500000,
  totalCommissionExpenses: 24250000,
  netProfit: 94500000,
  deliveryProfit: 18200000,
  topSellingProducts: [
    { productName: 'Patung Garuda Wisnu', totalQuantity: 72 },
    { productName: 'Patung Ganesha', totalQuantity: 55 },
    { productName: 'Patung Naga', totalQuantity: 43 },
    { productName: 'Patung Buddha', totalQuantity: 31 },
    { productName: 'Patung Barong', totalQuantity: 28 }
  ],
  topPerformingTourGuides: [
    { tourGuide: 'Adi Putra', totalSales: 42000000 },
    { tourGuide: 'Maya Arum', totalSales: 36500000 },
    { tourGuide: 'Rizki Hadi', totalSales: 28700000 },
    { tourGuide: 'Nina Saras', totalSales: 21400000 },
    { tourGuide: 'Dian Prasetya', totalSales: 18900000 }
  ],
  topPerformingArtisans: [
    { artisanName: 'Sari Dewi', totalQuantity: 84 },
    { artisanName: 'Wayan Komang', totalQuantity: 68 },
    { artisanName: 'Budi Santoso', totalQuantity: 57 },
    { artisanName: 'Ika Putri', totalQuantity: 44 },
    { artisanName: 'Gusti Made', totalQuantity: 39 }
  ]
};

const AnalyticsReport = () => {
  const [analytics, setAnalytics] = useState(mockData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/analytics/summary`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          setAnalytics(result.data);
        } else {
          throw new Error(result.message || 'Invalid analytics response');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Unable to load analytics summary. Showing sample data.');
          setAnalytics(mockData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    return () => controller.abort();
  }, []);

  const {
    totalRevenue,
    totalCommissionExpenses,
    netProfit,
    deliveryProfit,
    topSellingProducts,
    topPerformingTourGuides,
    topPerformingArtisans
  } = analytics;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Analytics Report</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Business performance overview
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Live KPI summary powered by your analytics API. The dashboard falls back to realistic sample data while loading or if the API cannot connect.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <Sparkles className="h-5 w-5 text-sky-500" />
            <span className="text-sm font-medium text-slate-700">
              {loading ? 'Loading live data...' : error ? 'Mock data active' : 'Live data connected'}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm">
            {error}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Total Revenue</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">
                    {formatRupiah(totalRevenue)}
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Revenue from sales and services across the analytics period.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Net Profit</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{formatRupiah(netProfit)}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Net earnings after commissions and operational costs.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Delivery Profit (15%)</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{formatRupiah(deliveryProfit)}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Profit contribution from premium delivery pricing.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Total Commission Expenses</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{formatRupiah(totalCommissionExpenses)}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                  <Trophy className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Total commission payouts to artisans and tour guides.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Product velocity
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Top selling products</h2>
              </div>
              <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                {topSellingProducts.length} items
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSellingProducts} margin={{ top: 8, right: 0, left: -12, bottom: 0 }}>
                  <XAxis dataKey="productName" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} interval={0} angle={-20} textAnchor="end" height={70} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip formatter={(value) => [`${value} units`, 'Quantity']} cursor={{ fill: 'rgba(56, 189, 248, 0.08)' }} />
                  <Bar dataKey="totalQuantity" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <section className="mt-10 grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Top Selling Products</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">Quantity leaderboard</h3>
              </div>
              <div className="rounded-2xl bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700">
                <Trophy className="inline-block h-4 w-4 align-middle" />
              </div>
            </div>
            <div className="space-y-4">
              {topSellingProducts.map((item, index) => (
                <div key={item.productName} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.productName}</p>
                    <p className="text-sm text-slate-500">Rank {index + 1}</p>
                  </div>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
                    {item.totalQuantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Top Tour Guides</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">Revenue leaders</h3>
              </div>
              <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                <Star className="inline-block h-4 w-4 align-middle" />
              </div>
            </div>
            <div className="space-y-4">
              {topPerformingTourGuides.map((item, index) => (
                <div key={item.tourGuide} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.tourGuide}</p>
                    <p className="text-sm text-slate-500">Sales: {formatRupiah(item.totalSales)}</p>
                  </div>
                  <span className="rounded-full bg-emerald-900 px-3 py-1 text-sm font-semibold text-white">
                    #{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Top Artisans</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">Production champions</h3>
              </div>
              <div className="rounded-2xl bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700">
                <TrendingUp className="inline-block h-4 w-4 align-middle" />
              </div>
            </div>
            <div className="space-y-4">
              {topPerformingArtisans.map((item, index) => (
                <div key={item.artisanName} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.artisanName}</p>
                    <p className="text-sm text-slate-500">Items sold: {item.totalQuantity}</p>
                  </div>
                  <span className="rounded-full bg-violet-900 px-3 py-1 text-sm font-semibold text-white">
                    #{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalyticsReport;
