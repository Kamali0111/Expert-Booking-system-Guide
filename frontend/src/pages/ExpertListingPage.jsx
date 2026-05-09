import React, { useState, useEffect, useCallback } from 'react';
import { expertService } from '../services/api';
import { ExpertCard, Pagination, Header, Footer } from '../components/Layout';
import {
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  InputField,
  SelectField,
} from '../components/Common';

const ExpertListingPage = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const categories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Data Science',
    'Cloud Architecture',
    'DevOps',
  ];

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch experts
  const fetchExperts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await expertService.getExperts(
        currentPage,
        10,
        debouncedSearch,
        category
      );

      setExperts(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to load experts. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch, category]);

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Expert
            </h1>
            <p className="text-gray-600 text-lg">
              Book sessions with industry-leading professionals across various domains
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                placeholder="Search by expert name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SelectField
                options={categories}
                value={category}
                onChange={handleCategoryChange}
              />
            </div>
          </div>

          {/* Error State */}
          {error && (
            <ErrorMessage message={error} onRetry={fetchExperts} />
          )}

          {/* Loading State */}
          {loading && <LoadingSpinner />}

          {/* Experts Grid */}
          {!loading && experts.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {experts.map((expert) => (
                  <ExpertCard key={expert._id} expert={expert} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && experts.length === 0 && !error && (
            <EmptyState
              title="No Experts Found"
              description="Try adjusting your search or filters"
              icon="🔍"
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ExpertListingPage;
