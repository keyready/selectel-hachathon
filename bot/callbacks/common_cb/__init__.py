from aiogram import Router,F
from aiogram.types import CallbackQuery

from keyboards.new_kb import new_user_keyboard
from keyboards.exp_kb import exp_user_keyboard

router = Router()

@router.callback_query(F.data.startswith("new"))
async def new(cb: CallbackQuery):
    await cb.message.answer(text="Для новичков в проекте",reply_markup=new_user_keyboard())

@router.callback_query(F.data.startswith("exp"))
async def exp(cb: CallbackQuery):
    await cb.message.answer(text="Для действующих участников проекта",reply_markup=exp_user_keyboard())

