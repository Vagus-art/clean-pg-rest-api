import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactsService } from './contacts.service';
import { Contact, ContactResponse } from './interfaces/contact.interface';
import { ContactsEntity } from './contacts.entity';


@Controller('api/contacts')
export class ContactsController {

  constructor(private readonly CscService : ContactsService) {}

  @Get(':offset?')
  async getContactsDefault(@Param('offset') offset?: number): Promise<Contact[]> {
    return await this.CscService.getContactsDefault(offset);
  }

  @Get('/id/:id')
  async getContactById(@Param('id') id: number): Promise<Contact> {
    return await this.CscService.getContactById(id);
  }

  @Get('/search/:search')
  async getContactsBySearch(@Param('search') search: string): Promise<Contact[]> {
    return await this.CscService.getContactsBySearch(search);
  }

  @Post()
  createContact(@Body() NewContact: CreateContactDto): ContactResponse {
    return { message: 'you have sent this', data: this.CscService.createContact(NewContact) };
  }

  @Put(':id')
  updateContactById(@Body() UpdatedContact: CreateContactDto, @Param('id') id: number): ContactResponse {
    return { message: `you have updated the user : ${id}`, data: this.CscService.updateContactById(UpdatedContact,id) };
  }

  @Delete(':id')
  deleteContactById(@Param('id') id: number) : Promise<ContactsEntity> {
      return this.CscService.deleteContactById(id);
  }
}
