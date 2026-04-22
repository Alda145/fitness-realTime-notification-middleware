import { IsNotEmpty, IsString } from "class-validator";


export class HighlightDTO{
@IsString()
@IsNotEmpty()
title:string;

@IsString()
@IsNotEmpty()
description: string;

}