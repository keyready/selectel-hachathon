from aiogram.types import *
from aiogram.utils.keyboard import ReplyKeyboardBuilder,InlineKeyboardBuilder
from aiogram.types.web_app_info import WebAppInfo


def exp_user_keyboard() -> InlineKeyboardMarkup:
    kb = InlineKeyboardBuilder()

    kb.add(InlineKeyboardButton(text="Добавить донацию",callback_data="add_donation"))
    kb.add(InlineKeyboardButton(text="Запланировать донацию",callback_data="planning"))
    kb.add(InlineKeyboardButton(text="Карточки центров крови",callback_data="bloodstations"))
        
    return kb.as_markup(resize_keyboard=True)

def type_donation_keyboard() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()

    button_values = ["Цельная кровь","Плазма","Тромбоциты","Эритроциты","Гранулоциты"]
    for value in button_values:   
        kb.add(KeyboardButton(text=value))
    
    kb.adjust(2)

    return kb.as_markup(resize_keyboard=True)

# def calendar_keyboard() -> InlineKeyboardMarkup:
    # kb = InlineKeyboardBuilder()

def reward_keyboard() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()

    kb.add(KeyboardButton(text="Безвозмездно"))
    kb.add(KeyboardButton(text="Платно"))

    kb.adjust(2)

    return kb.as_markup(resize_keyboard=True)

def place_keyboard() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()

    kb.add(KeyboardButton(text="Стационарный пункт"))
    kb.add(KeyboardButton(text="Выездная акция"))

    kb.adjust(2)

    return kb.as_markup(resize_keyboard=True)

def city_keyboard() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()

    cities = [
        "Москва",
        "Санкт-Петербург",
        "Новосибирск",
        "Екатеринбург",
        "Нижний Новгород",
        "Самара",
        "Омск",
        "Казань",
        "Челябинск",
        "Ростов-на-Дону"
    ]

    for city in cities:
        kb.add(KeyboardButton(text=city))
    
    kb.adjust(2)

    return kb.as_markup(resize_keyboard=True)

