import { render, screen } from '@testing-library/react';

test('React and JSX are working', () => {
  const TestComponent = () => <div>Hello World</div>;
  render(<TestComponent />);
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});

test('Provider and basic component work', () => {
  const { configureStore } = require('@reduxjs/toolkit');
  const { Provider } = require('react-redux');
  const TestComponent = () => <div>Test Component</div>;
  
  const store = configureStore({
    reducer: {
      test: (state = {}) => state,
    },
  });

  render(
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );

  expect(screen.getByText('Test Component')).toBeInTheDocument();
});