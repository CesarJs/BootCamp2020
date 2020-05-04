import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: string): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: {
        date,
      },
    });
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
