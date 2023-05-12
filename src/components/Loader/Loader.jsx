import styles from './Loader.module.scss';
import { Spin } from 'antd';

const Loader = () => (
  <div className={styles.container}>
    <Spin size="large" spinning={true} />
  </div>
);

export default Loader;
