import requests,json

from aiogram.fsm.context import FSMContext
from aiogram import Router,F
from aiogram.types import Message,CallbackQuery
from forms import *

router = Router()

form = RegisterForm()

@router.callback_query(F.data.startswith("register"))
async def register(cb: CallbackQuery,state: FSMContext) -> None:
    await cb.message.answer(text="Введи имя: ")
    await state.set_state(form.name)

@router.message(form.name)
async def process_name(message: Message,state: FSMContext) -> None:
    await state.update_data(name=message.text)

    await message.answer(text="Введи почту: ")
    await state.set_state(form.email)

@router.message(form.email)
async def process_email(message: Message,state: FSMContext) -> None:
    await state.update_data(email=message.text)

    await message.answer("Придумай пароль: ")
    await state.set_state(form.password)

@router.message(form.password)
async def process_password(message: Message,state: FSMContext) -> None:
    await state.update_data(password=message.text)

    user_data = await state.get_data()

    resp=requests.post("http://localhost:5000/register",json=json.dumps({"user_data":user_data})).json()
    await message.answer("Данные того, кто зарегался {}}".format(resp))

    await state.clear()