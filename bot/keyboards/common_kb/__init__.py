from aiogram.types import *
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram.types.web_app_info import WebAppInfo

def start_keyboard() -> InlineKeyboardMarkup:
    kb = InlineKeyboardBuilder()

    kb.add(InlineKeyboardButton(text="Опытный донор?",callback_data="exp"))
    kb.add(InlineKeyboardButton(text="Новенький в донорстве?",callback_data="new"))
    kb.adjust(2)

    return kb.as_markup(resize_keyboard=True)

def common_keyboard() -> InlineKeyboardMarkup:
    kb = InlineKeyboardBuilder()

    kb.add(InlineKeyboardButton(text="🙏 Пожертвование",web_app=WebAppInfo(url="https://donorsearch.org/donate/")))
    kb.add(InlineKeyboardButton(text="📚 Поиск статьи",web_app=WebAppInfo(url="https://journal.donorsearch.org/")))
    kb.add(InlineKeyboardButton(text="🎲 Игры и специальные проекты",web_app=WebAppInfo(url="https://specials.donorsearch.org/")))
    
    #TODO Нужно знать город юзера
    # kb.add(InlineKeyboardButton(text="Адресные потребности",web_app=WebAppInfo(url="https://donorsearch.org/helpme/")))
    # kb.add(InlineKeyboardButton(text="Мероприятия",web_app=WebAppInfo(url="https://unity.donorsearch.org/")))

    kb.adjust(2)

    return kb.as_markup(resize_keyboard=True)
