import { ERRORS } from "../constants/errors";
import { Request, Response, NextFunction } from 'express';
import { read } from 'xlsx';
import xlsx from 'xlsx';
import { prisma } from "../database/index";


const pacienteController = {

    async listPacientes(req: Request, res: Response, next: NextFunction) {
        try {
            const listarPaciente = await prisma.paciente.findMany();
            res.status(200).json(listarPaciente);
        } catch (error) {
            next(error);
        }
    },

    async byIdPaciente(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            const paciente = await prisma.paciente.findUnique({
                where: {
                    id,
                }
            });

            if (!paciente) {
                res.status(404).json(ERRORS.PACIENTES.ID)
            };

            res.status(200).json(paciente)

        } catch (error) {
            next(error)
        }

    },

    async createPaciente(req: Request, res: Response, next: NextFunction) {
        try {
            const { nome, email, idade } = req.body;
            const paciente = await prisma.paciente.create({
                data: {
                    nome: nome,
                    email: email,
                    idade: idade
                }
            });

            res.status(201).json(paciente)
        } catch (error) {
            next(error)
        }
    },

    async updatePaciente(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { nome, email, idade } = req.body;

            const paciente = await prisma.paciente.findUnique({
                where: {
                    id,
                }
            });

            if (!paciente) {
                res.status(400).json(ERRORS.PACIENTES.ID)
            };

            const updated = await prisma.paciente.update({
                where: {
                    id,
                },
                data: {
                    nome,
                    email,
                    idade,
                },
            });

            res.status(200).json({ result: updated})
        } catch (error) {
            next(error)

        }
    },

    async deletePaciente(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const paciente = await prisma.paciente.findUnique({
                where: {
                    id,
                }
            });

            if (!paciente) {
                res.status(404).json(ERRORS.PACIENTES.ID)
            };

            await prisma.paciente.delete({
                where: {
                    id,
                },
            });

            res.sendStatus(204)

        } catch (error) {
            next(error)
        }
    },

};

export default pacienteController