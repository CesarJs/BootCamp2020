import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appontimentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appontimentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This apointiment is alredy bookerd');
    }
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appontimentDate,
    });
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
