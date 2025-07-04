import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CiudadDTO } from './dto/create-ciudad.dto';
//import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';

@Injectable()
export class CiudadService {
  private ciudades: Ciudad[] = [];
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  public async getAll(): Promise<Ciudad[]> {
    this.ciudades=[];
    let ciudadesArr: Ciudad[] = await this.ciudadRepository.find();
    this.ciudades = [...this.ciudades, ...ciudadesArr];
    return this.ciudades;
  }
  public async getById(id: number): Promise<Ciudad> {
    try {
      const criterio: FindOneOptions = { where: { idCiudad: id } };
      let ciudad = await this.ciudadRepository.findOne(criterio);
      if (ciudad) return ciudad;
      throw new NotFoundException('La ciudad no se encuentra');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda de ciudad ' + id + ' : ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

//POST
  public async addCiudad(ciudadDTO : CiudadDTO) : Promise<Ciudad> {
    try {
       let ciudad : Ciudad = await this.ciudadRepository.save( new Ciudad(
           ciudadDTO.nombre 
       ) );
       if (ciudad.getIdCiudad())
          return ciudad;
       else
          throw new NotFoundException('No se pudo crear la ciudad');
    } catch (error) {
          throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                error : 'Error en la creacion de ciudad '+error}, HttpStatus.NOT_FOUND);
    }
 }
//UPDATE

public async updateCiudad(id: number, ciudadDTO : CiudadDTO) : Promise<Ciudad> {
  try {
    const criterio: FindOneOptions = { where: { idCiudad: id } };
    let ciudad = await this.ciudadRepository.findOne(criterio);
     //let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
     if (!ciudad)
        throw new NotFoundException('No se encuentra la ciudad');
     else
        ciudad.setNombre(ciudadDTO.nombre);
     ciudad = await this.ciudadRepository.save(ciudad);
     return ciudad;
  } catch (error) {
        throw new HttpException( { status : HttpStatus.NOT_FOUND, 
              error : 'Error en la actiualizacion de ciudad '+error}, HttpStatus.NOT_FOUND);
  }
}


//DELETE

public async deleteCiudad(id : number) : Promise<boolean> {
  try {
     let criterio: FindOneOptions = { where: { idCiudad: id }};//establesco un criterio
     let ciudad = await this.ciudadRepository.findOne(criterio);//busco para saber si la ciudad existe
     if (!ciudad)
        throw new NotFoundException('No se encuentra la ciudad');
     else
        await this.ciudadRepository.delete( ciudad.getIdCiudad() );//la elimino por condicion id
     return true;
  } catch (error) {
        throw new HttpException( { status : HttpStatus.NOT_FOUND, 
              error : 'Error en la eliminacion de ciudad '+error}, HttpStatus.NOT_FOUND);
  }
}






  /*
  create(createCiudadDto: CreateCiudadDto) {
    return 'This action adds a new ciudad';
  }

  findOne(id: number) {
    return `This action returns a #${id} ciudad`;
  }

  update(id: number, updateCiudadDto: UpdateCiudadDto) {
    return `This action updates a #${id} ciudad`;
  }

  remove(id: number) {
    return `This action removes a #${id} ciudad`;
  }*/
}
