import { Button, Result } from 'antd';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const AppErrorPage = ({ appError }) => {
    const navigate = useNavigate();
    console.log('error')

    const onReloadClick = () => {
        window.location.reload();
    };

    const onGoHomeClick = () => {
        navigate('/');
    };

    return (
        <Result
            status="500"
            title="Oops! Something went wrong"
            subTitle={appError}
            extra={[
                <Button type="primary" size="large" onClick={onReloadClick} key="reload">
                    Reload page
                </Button>,
                <Button type="primary" size="large" onClick={onGoHomeClick} key="home">
                    Back to Home
                </Button>,
            ]}
        />
    );
};

export default memo(AppErrorPage);
