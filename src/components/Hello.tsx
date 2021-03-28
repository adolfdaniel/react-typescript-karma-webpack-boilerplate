import * as React from 'react';
import { string } from 'prop-types';

interface IHelloProps { compiler: string; framework: string; }

const Hello: React.FunctionComponent<IHelloProps> = ({ compiler, framework }) => (
  <h1>
    <span>Hello from </span>
    {compiler}
    <span> and </span>
    {framework}
    !
  </h1>
);

Hello.propTypes = {
  compiler: string.isRequired,
  framework: string.isRequired,
};

export default Hello;
