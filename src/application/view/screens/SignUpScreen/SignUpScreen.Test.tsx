// __tests__/SighUpScreen.test.tsx
import React from 'react';
import renderer from 'react-test-renderer';

import { SignUpScreen } from './SignUpScreen.Component';

it('renders correctly', () => {
  const signUpTree = renderer
    .create(<SignUpScreen navigation={() => {}} signUp={() => {}}/>)
    .toJSON();
  expect(signUpTree).toMatchSnapshot();
});