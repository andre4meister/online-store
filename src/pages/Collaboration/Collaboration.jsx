import styles from './Collaboration.module.scss';
import PageTitle from "../../components/PageTitle/PageTitle";

const Collaboration = () => {
    return (
        <div className={styles.container}>
            <PageTitle title="Співпраця"/>
            <div className={styles.text}>
                <div className={styles.block__title}>
                    <h4>Партнери</h4>
                    <p>Ми будемо раді співпрацювати з іншими компаніями у нашій сфері та займатися спільними проектами.
                        Якщо ви шукаєте надійного партнера, з яким можна плідно працювати та досягати спільних цілей, то
                        ми будемо раді розглянути можливості співпраці з вами. Наша молода команда буде рада
                        співпрацювати з креативними людьми, які хочуть творити. Ми раді різноманітим людям, тому якщо ви
                        знаєте і хочете покращити наш бренд - ми чекаєм саме вас. Давайте творити та покращувати цей
                        світ!
                    </p>
                    <p>Пропозиції для постачальників: ligogo@gmail.com</p>
                    <p>Для комерційних пропозицій: ligoagency@gmail.com</p>
                </div>
                <div className={styles.block__title}>
                    <h4>Робота</h4>
                    <p>ОХочете працювати в нашій команді? Вам є що запропонувати? Ми тільки за! Відправляйте ваше резюме
                        на нашу пошту, ми обов’язково його розглянемо і відпишемо.
                    </p>
                    <p>Для роботи: ligowork@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default Collaboration;