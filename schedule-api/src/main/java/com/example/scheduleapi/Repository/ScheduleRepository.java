package com.example.scheduleapi.Repository;

import com.example.scheduleapi.Model.Schedule;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ScheduleRepository extends CrudRepository<Schedule, Long> {

    @Query("SELECT s FROM Schedule s WHERE s.user_id= :user_id")
    Iterable<Schedule> findAllByUser(Long user_id);
}