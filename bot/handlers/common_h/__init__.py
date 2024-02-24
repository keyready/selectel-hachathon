from aiogram import Router
from aiogram.filters import Command,CommandStart
from aiogram.types import Message

from keyboards.common_kb import (
    common_keyboard,
    start_keyboard
)

router = Router()

@router.message(Command("common"))
async def common(message: Message):
    await message.answer(
        "Общее",
        reply_markup=common_keyboard()
    )

@router.message(CommandStart())
async def start(message: Message):
    await message.answer(
        "Приветствую, {}".format(message.from_user.full_name),
        reply_markup=start_keyboard()
    )
