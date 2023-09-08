import { AddressEntity } from '../entities/address.entity';

export class CreateAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  cityId: number;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
  }
}
