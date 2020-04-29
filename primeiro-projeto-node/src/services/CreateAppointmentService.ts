import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * Recebimento das informações
 * Tratativa de erros/ excessões
 * Acessoa o repositorio
 */
interface Request {
  provider: string;
  date: Date;
}
/**
 * Dependency invertion
 * Sempre que o service tiver umd ependencia externa, receber o repositor como aprametro
 */
class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appontimentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      date,
    );
    if (findAppointmentInSameDate) {
      throw Error('This apointiment is alredy bookerd');
    }
    const appointment = this.appointmentsRepository.create({
      provider,
      date: appontimentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
