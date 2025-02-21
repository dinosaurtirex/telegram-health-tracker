import { CALLBACKS_REPORT_KEYS, HEADACHE_KEYS, MENTAL_STATE_KEYS } from "./keys";

export const everydayNotification =
    "Уведомление!\n\n" +
    "Вы не заполнили ваше актуальное состояние, необходимо это сделать\n\n" +
    "Чтобы внести данные, используйте команду /report";

export const startServiceMessageText =
    "Добро пожаловать!\n\n" +
    "Этот бот поможет вам отслеживать состояния здоровья, такие как:\n\n" +
    "\u2022 Ментальное состояние\n" +
    "\u2022 Головная боль\n" +
    "\u2022 Другие недуги\n\n" +
    "Каждый день бот напомнит о необходимости записи.\n\n" +
    "Чтобы внести данные, используйте команду /report";

export const dataWriteSuccessText =
    "Данные успешно сохранены!\n\n" +
    "Что дальше?\n\n" +
    "\u2022 Повторите запись, если состояние изменилось\n" +
    "\u2022 Добавьте данные в другие категории\n\n" +
    "Для новой записи используйте /report";

export const chooseCategoryText = "Выберите категорию:";

export const headacheDegreeText = "Выберите степень головной боли:";

export const headacheCategoryTexts = {
    [HEADACHE_KEYS.STRONG]: "Сильная боль",
    [HEADACHE_KEYS.MEDIUM]: "Средняя боль",
    [HEADACHE_KEYS.LOW]: "Слабая боль",
    [HEADACHE_KEYS.CLEAR]: "Боли нет"
};

export const mentalStateDegreeText = "Как вы оцениваете своё эмоциональное состояние?";

export const mentalStateCategoryTexts = {
    [MENTAL_STATE_KEYS.PERFECT]: "Отлично",
    [MENTAL_STATE_KEYS.GOOD]: "Хорошо",
    [MENTAL_STATE_KEYS.BAD]: "Не очень",
    [MENTAL_STATE_KEYS.DEPRESSION]: "Депрессия"
};

export const reportCategoriesTexts = {
    [CALLBACKS_REPORT_KEYS.HEADACHE]: "Головная боль",
    [CALLBACKS_REPORT_KEYS.OTHER_ILLNESSES]: "Другие недуги",
    [CALLBACKS_REPORT_KEYS.MENTAL_STATE]: "Ментальное состояние",
    [CALLBACKS_REPORT_KEYS.START_SCREEN]: "На главный экран"
};

export const otherMentalStateText =
    "Не нашли нужный вариант?\n\n" +
    "Введите /other и опишите своё состояние – мы добавим его в историю.";
