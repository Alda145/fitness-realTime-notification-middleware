import { Entity, PrimaryGeneratedColumn ,Column } from "typeorm";

@Entity('highlights')
export class HighlightsEntity{

@PrimaryGeneratedColumn()
id:number;

@Column()
title:string;

@Column()
description:string;

@Column()
image:string

}
