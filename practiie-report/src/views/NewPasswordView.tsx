// src/views/NewPasswordView.tsx
import React from 'react';
import NewPassword from '../components/NewPassword';
import NewPasswordController from '../controllers/NewPasswordController';

const NewPasswordView: React.FC = () => {
    const { resetPassword } = NewPasswordController(); 

    return <NewPassword resetPassword={resetPassword} />;
};

export default NewPasswordView;
