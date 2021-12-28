import React, { FC } from 'react';
import { TcpSettings } from '../container/tcp-settings';
import { LogView } from '~/container/LogView';

const MainPage: FC = () => {
  return (
    <div>
      <TcpSettings />
      <LogView />
    </div>
  );
};

export { MainPage };
