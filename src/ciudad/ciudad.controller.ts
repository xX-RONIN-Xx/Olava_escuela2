import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadDTO } from './dto/create-ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';
//import { UpdateCiudadDto } from './dto/update-ciudad.dto';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get()
  getAll() :Promise<Ciudad[]>{
    return this.ciudadService.getAll();
  }
  @Post()
  private crearCiudad(@Body() ciudad : CiudadDTO): Promise<Ciudad> {
    return this.ciudadService.addCiudad(ciudad);
  }

  @Put(':idCiudad')
    private actualizarCiudad(@Param('idCiudad') id : number, 
					      @Body() ciudad : CiudadDTO): Promise<Ciudad> {
	    return this.ciudadService.updateCiudad(id, ciudad)
    }

    @Delete(':idCiudad')
      private eliminarCiudad(@Param('idCiudad') id : number): Promise<boolean> {
        return this.ciudadService.deleteCiudad(id);
      }
  



 /*
  @Post()
  create(@Body() createCiudadDto: CreateCiudadDto) {
    return this.ciudadService.create(createCiudadDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ciudadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCiudadDto: UpdateCiudadDto) {
    return this.ciudadService.update(+id, updateCiudadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciudadService.remove(+id);
  }*/
}
