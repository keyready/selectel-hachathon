import asyncio
import logging

from config import config
from aiogram import Bot,Dispatcher,F
from aiogram.enums import ParseMode
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import *
from aiogram.filters import Command
from handlers import common_h
from callbacks import new_cb,common_cb,exp_cb

async def main():
    bot=Bot(token=config.bot_token.get_secret_value(),parse_mode=ParseMode.MARKDOWN)
    dp=Dispatcher(storage=MemoryStorage())
    
    dp.include_routers(
        common_h.router,
        new_cb.router,
        common_cb.router,
        exp_cb.router
    )

    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot,allowed_updates=dp.resolve_used_update_types())

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())