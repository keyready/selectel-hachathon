from aiogram.fsm.state import State,StatesGroup

class RegisterForm(StatesGroup):
    email=State()
    name=State()
    password=State()

class CreateDonateForm(StatesGroup):
    type=State()
    date=State()
    foc=State()
    place=State()
    city=State()
    centre=State()
    doc=State()