import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from '../pages/Home';
import searchSlice from '../store/searchSlice';

// Mock the API hook
jest.mock('../api/anime', () => ({
  useSearchAnime: jest.fn(),
}));

// Mock the custom hooks
jest.mock('../hooks/useDebounce', () => ({
  __esModule: true,
  default: jest.fn((value) => value), // Return value immediately for testing
}));

// Mock child components
jest.mock('../components/pages/home/AnimeCardSkeleton', () => {
  return function MockAnimeCardSkeleton() {
    return <div data-testid="skeleton">Loading...</div>;
  };
});

jest.mock('../components/pages/home/AnimeCard', () => {
  return function MockAnimeCard({ anime }: { anime: any }) {
    return <div data-testid="anime-card">{anime.title}</div>;
  };
});

jest.mock('../components/pages/home/NoResult', () => {
  return function MockNoResult() {
    return <div data-testid="no-result">No results found</div>;
  };
});

// Create a mock store utility
const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      search: searchSlice,
    },
    preloadedState: {
      search: {
        query: '',
        page: 1,
        list: [],
        hasNextPage: true,
        ...preloadedState,
      },
    },
  });
};

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('Home Component', () => {
  const mockUseSearchAnime = jest.requireMock('../api/anime').useSearchAnime;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearchAnime.mockReturnValue({
      data: null,
      isLoading: false,
    });
  });

  const renderWithProvider = (store: any) => {
    return render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  };

  test('renders initial loading state correctly', () => {
    mockUseSearchAnime.mockReturnValue({
      data: null,
      isLoading: true,
    });

    const store = createMockStore();
    renderWithProvider(store);

    expect(screen.getAllByTestId('skeleton')).toHaveLength(8);
  });

  test('renders anime cards when data is available', async () => {
    const mockAnimeList = [
      { mal_id: 1, title: 'Naruto' },
      { mal_id: 2, title: 'One Piece' },
    ];

    mockUseSearchAnime.mockReturnValue({
      data: {
        data: mockAnimeList,
        pagination: { has_next_page: true },
      },
      isLoading: false,
    });

    const store = createMockStore({ list: mockAnimeList });
    renderWithProvider(store);

    expect(screen.getAllByTestId('anime-card')).toHaveLength(2);
    expect(screen.getByText('Naruto')).toBeInTheDocument();
    expect(screen.getByText('One Piece')).toBeInTheDocument();
  });

  test('shows no results when search returns empty', () => {
    mockUseSearchAnime.mockReturnValue({
      data: {
        data: [],
        pagination: { has_next_page: false },
      },
      isLoading: false,
    });

    const store = createMockStore({ 
      query: 'nonexistent anime',
      list: [],
      hasNextPage: false 
    });
    renderWithProvider(store);

    expect(screen.getByTestId('no-result')).toBeInTheDocument();
  });

  test('does not show loader when no next page', () => {
    const mockAnimeList = [
      { mal_id: 1, title: 'Naruto' },
    ];

    mockUseSearchAnime.mockReturnValue({
      data: {
        data: mockAnimeList,
        pagination: { has_next_page: false },
      },
      isLoading: false,
    });

    const store = createMockStore({ 
      list: mockAnimeList,
      hasNextPage: false 
    });
    renderWithProvider(store);

    // The loader div should not be in the document
    const loaders = screen.queryAllByTestId('skeleton');
    expect(loaders).toHaveLength(0);
  });

  test('renders correct grid layout classes', () => {
    mockUseSearchAnime.mockReturnValue({
      data: {
        data: [{ mal_id: 1, title: 'Test Anime' }],
        pagination: { has_next_page: true },
      },
      isLoading: false,
    });

    const store = createMockStore({ 
      list: [{ mal_id: 1, title: 'Test Anime' }] 
    });
    renderWithProvider(store);

    const grid = screen.getByText('Test Anime').closest('div[class*="grid"]');
    expect(grid).toHaveClass('grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4');
  });
});

describe('Home Component Integration', () => {
  const mockUseSearchAnime = jest.requireMock('../api/anime').useSearchAnime;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('dispatches resetList when debounced query changes', async () => {
    const mockStore = createMockStore();
    mockStore.dispatch = jest.fn();

    mockUseSearchAnime.mockReturnValue({
      data: null,
      isLoading: false,
    });

    const { rerender } = render(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    );

    // Simulate query change by updating store and rerendering
    const newStore = createMockStore({ query: 'new query' });
    newStore.dispatch = jest.fn();

    rerender(
      <Provider store={newStore}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      expect(newStore.dispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: 'search/resetList'
      }));
    });
  });

  test('dispatches appendList when new data is received', async () => {
    const mockStore = createMockStore();
    const mockDispatch = jest.fn();
    mockStore.dispatch = mockDispatch;

    const mockData = {
      data: [{ mal_id: 1, title: 'New Anime' }],
      pagination: { has_next_page: true },
    };

    mockUseSearchAnime.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: 'search/appendList',
        payload: mockData
      }));
    });
  });
});