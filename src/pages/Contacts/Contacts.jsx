import styles from './Contacts.module.scss';
import PageTitle from "../../components/PageTitle/PageTitle";
const Contacts = () => {
    return (
        <div className={styles.container}>
            <PageTitle title="Оплата і доставка" />
            <div className={styles.text}>
                <div className={styles.block__title}>
                    <h4>Дзвоніть</h4>
                    <li>0 800 600 200</li>
                    <li>(067) 353-37-27</li>
                    <li>(099) 060-51-81</li>
                    <li>(093) 631-92-50</li>
                </div>
                <div className={styles.block__title}>
                    <h4>Пишіть</h4>
                    <p>ligosupport@gmail.com</p>
                </div>
                <div className={styles.block__title}>
                    <h4>Адреса</h4>
                    <p>Хочете приміряти і не любите замовляти онлайн? Тоді приходьте до нас у Львові за адресою
                        Героїв Упа 404
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
