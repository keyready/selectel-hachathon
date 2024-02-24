from aiogram.types import *
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram.types.web_app_info import WebAppInfo

def new_user_keyboard() -> InlineKeyboardMarkup:
    kb = InlineKeyboardBuilder()

    kb.add(InlineKeyboardButton(text="Как стать донором?",web_app=WebAppInfo(url="https://donorsearch.org/how/?utm_source=main_page&utm_medium=how&utm_campaign=donor_search")))
    kb.add(InlineKeyboardButton(text="Пройти регистрацию",callback_data="register"))

    return kb.as_markup(resize_keyboard=True)