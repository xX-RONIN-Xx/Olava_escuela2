import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ciudades')
export class Ciudad {
    @PrimaryGeneratedColumn()
    private idCiudad : number;
    @Column()
    private nombre : string;

    constructor (nombre : string) {
        this.nombre = nombre;
    }

    public getIdCiudad(): number { return this.idCiudad; }
    public getNombre(): string { return this.nombre; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
}
