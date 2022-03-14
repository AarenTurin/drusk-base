import { Component, Inject, Logger }     from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces';

import { IBootService } from './boot-service.interface';
import { BootAuthService } from './module-boots/boot-auth.service';
import { BootCurriculumService } from './module-boots/boot-curriculum.service';
import { ConfigureCorsService } from './configure-server/configure-cors.service';
import { ConfigureAuthService } from './configure-server/cofigure-auth.service';

@Component()
export class BootService implements IBootService {
    private _bootables: IBootService[];

    constructor(configCors :ConfigureCorsService,
        configAuth :ConfigureAuthService,
        bootAuth   :BootAuthService, 
        bootCurr   :BootCurriculumService) 
    {
       // Important, bootables will be executed in order of array.
    this._bootables = [ // 1. Server Configurators - (e.g. Passport, CORS, ..)
    configCors, configAuth,
    // 2. Module configurators - (e.g. Fixtures)
    bootAuth, bootCurr];
    }

    async boot(app: INestApplication, production: boolean): Promise<boolean> {
        Logger.log("Starting Application Boot Service", "BootService.boot");

        try
        {
            for(let bootable of this._bootables)
            await bootable.boot(app, production); // await ensures synchronous execution
        }
        catch(e) {
            console.error(e);
            return false;
        }
        return true;    //&& await ..
    }
}
