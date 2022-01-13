import React, { FC } from 'react';
import Divider from '@mui/material/Divider';
import { TcpSettings } from '../container/TcpSettings';
import { LogView } from '~/container/LogView';

const MainPage: FC = () => {
  return (
    <div>
      <TcpSettings />
      <Divider />
      <LogView />
    </div>
  );
};

export { MainPage };
