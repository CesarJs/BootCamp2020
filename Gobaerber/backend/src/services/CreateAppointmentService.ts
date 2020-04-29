import { startOfHour, format } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appontimentDate = format(startOfHour(date), 'yyyy-MM-dd HH:mm:ss');

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appontimentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This apointiment is alredy bookerd');
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
