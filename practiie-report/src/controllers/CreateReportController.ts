import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createReport = async (req: Request, res: Response) => {
  try {
    console.log("Solicitud recibida en el backend con datos:", req.body);

    const {
      report_name,
      school,
      date,
      course,
      subject,
      student,
      title,
      objective,
      materials,
      procedure,
      dataResults,
      analysis,
      conclusions,
      references
    } = req.body;

    const report = await prisma.reportLab.create({
      data: {
        report_name,
        school,
        date: new Date(date),
        course,
        subject,
        student,
        title,
        objective,
        materials,
        procedure,
        dataResults,
        analysis,
        conclusions,
        references
      },
    });

    console.log("Reporte creado en la base de datos:", report);

    res.status(201).json(report);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Error creating report' });
  }
};

export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await prisma.reportLab.findMany();
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Error fetching reports' });
  }
};
