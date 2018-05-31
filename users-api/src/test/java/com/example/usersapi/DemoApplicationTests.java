package com.example.usersapi;

import com.codeborne.selenide.CollectionCondition;
import com.example.usersapi.models.User;
import com.example.usersapi.repositories.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Stream;

import static com.codeborne.selenide.Condition.appear;
import static com.codeborne.selenide.Condition.exist;
import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;
import static com.codeborne.selenide.Selenide.open;
import static java.lang.Thread.sleep;
import static java.time.zone.ZoneRulesProvider.refresh;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class DemoApplicationTests {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	User firstUser;
	User secondUser;
	@Before
	public void setUp() {
		userRepository.deleteAll();
		firstUser = new User("Ima", "Person","okay","woow","USER");
		firstUser.setPassword(bCryptPasswordEncoder.encode("woow"));
		secondUser = new User("Someone", "Else","someone","wow123","USER");
		secondUser.setPassword(bCryptPasswordEncoder.encode("wow123"));

		Stream.of(firstUser, secondUser)
				.forEach(user -> {
					userRepository.save(user);
				});

		System.setProperty("selenide.browser", "Chrome");
		System.setProperty("selenide.headless", "false");

		// Visit the UI in a browser
		open("http://localhost:4200");
	}

	@After
	public void tearDown() {
		userRepository.deleteAll();
	}

	@Test
	public void v1ShouldSeeHomePage() throws Exception {


		$("#login").should(exist);
		$("#signup").should(exist);

	}
	@Test
	public void v2ShouldLogin()  {
// Visit the new user page
		$("#login").click();

		$("#login-form").should(exist);


		// login form

		$("#username").sendKeys("okay");
		$("#password").sendKeys("woow");

		$("#login").click();

		// should be redirectetd to dashboard
		$("#records").should(exist);

	}
	@Test
	public void v3CanSingup() {
		$("#signup").click();
		$("#signup-form").should(exist);
		$("#username").sendKeys("okay12345");
		$("#password").sendKeys("woow");
		$("#confim_passowrd").sendKeys("woow");
		$("#firstName").sendKeys("okay");
		$("#lastName").sendKeys("lool");
		$("#signupButton").click();
		// should be redirectetd to dashboard

		$("#records").should(exist);

	}
	@Test
	public void v4CanUpdae(){
		v2ShouldLogin();
		$("#updateLink").click();
		$("#userDisplay").should(exist);
		$("#userData").shouldHave(text(""+firstUser.getFirstName()+" "+firstUser.getLastName()));
		$("#modal-update").click();
		

	}

//	}
//	@Test
//	public void v4ShouldDeleteUser(){
//		// Test Deleting the first user
//		long firstUserId = firstUser.getId();
//		$("#user-" + firstUserId).should(exist);
//		$$("[data-user-display]").shouldHave(CollectionCondition.size(2));
//
//		$("#delete-" + firstUserId).click();
//		$("#user-" + firstUserId).shouldNot(exist);
//		$$("[data-user-display]").shouldHave(CollectionCondition.size(1));
//
//
//	}
}
