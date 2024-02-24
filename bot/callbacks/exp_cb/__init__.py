from aiogram import Router,F
from aiogram.types import *
from aiogram.fsm.context import FSMContext

from keyboards.exp_kb import type_donation_keyboard
from forms import CreateDonateForm

router=Router()

form = CreateDonateForm()

@router.callback_query(F.data.startswith("add_donation"))
async def add_donation(cb: CallbackQuery, state: FSMContext) -> None:
    await cb.message.answer("Выбери тип донации: ",reply_markup=type_donation_keyboard())
    await state.set_state(form.type)

@router.message(form.type)
async def process(message: Message,state: FSMContext) -> None:
    await state.update_data(type=message.text)

    await message.answer(text="")

# @router.message(form.type)
# async def process(message: Message, state: FSMContext) -> None:
#     await state.update_data(type=message.text)

#     await message.answer("Выбери дату: ")
#     await state.set_data(form.date)
