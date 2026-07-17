from pydantic import BaseModel
from typing import Optional

class projectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    status: Optional[str] = "in progress"

class projectResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    status: str
    user_id: int

    class Config:
        from_attributes = True