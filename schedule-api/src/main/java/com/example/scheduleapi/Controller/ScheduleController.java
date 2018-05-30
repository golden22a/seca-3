package com.example.scheduleapi.Controller;

import com.example.scheduleapi.Model.Schedule;
import com.example.scheduleapi.Model.User;
import com.example.scheduleapi.Repository.ScheduleRepository;
import com.example.scheduleapi.Repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static com.example.scheduleapi.Controller.SecurityConstant.HEADER_STRING;
import static com.example.scheduleapi.Controller.SecurityConstant.SECRET;
import static com.example.scheduleapi.Controller.SecurityConstant.TOKEN_PREFIX;

@RestController
public class ScheduleController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;

    @GetMapping("/")
    public Iterable<Schedule> findByUser(HttpServletRequest request) {
        String token = request.getParameter(HEADER_STRING);

        // parse the token.
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET.getBytes())
                .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                .getBody();

        String user = claims.get("user", String.class);
        User userO = userRepository.findByUsername(user);


        return scheduleRepository.findAllByUser(userO.getId());
    }
    @GetMapping("/all")
    public Iterable<Schedule> findAllScheduls() {
        return scheduleRepository.findAll();
    }
    @GetMapping("/{scheduleId}")
    public Schedule findScheduleById(@PathVariable Long scheduleId) {
        return scheduleRepository.findOne(scheduleId);
    }
    @DeleteMapping("/{scheduleId}")
    public HttpStatus deleteScheduleById(@PathVariable Long scheduleId) {
        scheduleRepository.delete(scheduleId);
        return HttpStatus.OK;
    }
    @PostMapping("/")
    public Schedule createNewSchedule(@RequestBody Schedule newSchedule,HttpServletRequest request) {
        String token = request.getParameter(HEADER_STRING);
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET.getBytes())
                .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                .getBody();

        String user = claims.get("user", String.class);
        User userO = userRepository.findByUsername(user);
        newSchedule.setUserId(userO.getId());
        return scheduleRepository.save(newSchedule);
    }
    @PatchMapping("/{scheduleId}")
    public Schedule updateScheduleById(@PathVariable Long scheduleId, @RequestBody Schedule scheduleRequest) {

        Schedule scheduleFromDb = scheduleRepository.findOne(scheduleId);

        scheduleFromDb.setNote(scheduleRequest.getNote());


        return scheduleRepository.save(scheduleFromDb);
    }




}
