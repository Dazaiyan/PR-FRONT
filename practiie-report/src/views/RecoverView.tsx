import React from 'react';
import Recover from '../components/Recover';
import RecoverController from '../controllers/RecoverController';

const LoginView: React.FC = () => {
    const { recoverPassword } = RecoverController(); 

    return <Recover recoverPassword={recoverPassword} />;
};

export default LoginView;
