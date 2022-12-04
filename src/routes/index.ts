import express, { Request, Response } from "express";
import pacientesController from "../controllers/pacientesController";
import byIdValidation from "../validations/psicologos/getOne";
import pacienteCreateValidation from "../validations/pacientes/create";
import pacienteUpdateValidation from "../validations/pacientes/update";
import multer from 'multer';

const upload = multer()
const routes = express.Router();

routes.get("/", (req:Request, res:Response) =>{
    return res.json("Api rodando corretamente");
});

routes.get("/pacientes", pacientesController.listPacientes);
routes.get("/paciente/:id", byIdValidation, pacientesController.byIdPaciente);
routes.post("/paciente/criar", pacienteCreateValidation, pacientesController.createPaciente);
routes.put("/paciente/:id", pacienteUpdateValidation, pacientesController.updatePaciente);
routes.delete("/paciente/:id", byIdValidation, pacientesController.deletePaciente);

export default routes;