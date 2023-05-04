import { Button, Result, Row } from 'antd';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = ({}) => {
    const navigate = useNavigate();
    console.log('not found')
    const onMainPageClick = () => {
        navigate('/');
    };

    const onGoBackClick = () => {
        navigate(-1);
    };

    return (
        <Row justify="center" align="middle">
            <Result
                status="404"
                title={`Not found. There is no page with this url.`}
                extra={[
                    <Button type="primary" size="large" onClick={onMainPageClick} key="main">
                        Go to main page
                    </Button>,
                    <Button type="primary" size="large" onClick={onGoBackClick} key="back">
                        Go back
                    </Button>,
                ]}
            />
        </Row>
    );
};

export default memo(NotFoundPage);
