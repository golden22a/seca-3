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
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Stream;

import static com.codeborne.selenide.Condition.appear;
import static com.codeborne.selenide.Condition.exist;
import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;
import static com.codeborne.selenide.Selenide.open;
import static java.time.zone.ZoneRulesProvider.refresh;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class DemoApplicationTests {
	@Autowired
	private UserRepository userRepository;

	User firstUser;
	User secondUser;
	@Before
	public void setUp() {
		userRepository.deleteAll();
		firstUser = new User("Ima", "Person","okay","woow","USER");

		secondUser = new User("Someone", "Else","someone","wow123","USER");
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
		$("#sigunp").should(exist);

	}
	@Test
	public void v2ShouldAddaUser() throws Exception {
// Visit the new user page
		long secondUserId = secondUser.getId();

		$("#add-user-form").should(exist);


		// Add a new user

		$("#first-name-input").sendKeys("Third");
		$("#last-name-input").sendKeys("User");

		$("#add-user").click();

		// Now there should be three Users
		$$("[data-user-display]").shouldHave(CollectionCondition.size(3));

		refresh();

		// Now there should be three Users again after the refresh
		$$("[data-user-display]").shouldHave(CollectionCondition.size(3));

		// Check that the data is showing up for the third User
		Long thirdUserId = secondUserId + 1;
		$("#user-" + thirdUserId).shouldHave(text("Third User"));
	}
	@Test
	public void v3ShouwEditaUser() {
		long secondUserId = secondUser.getId();
		// test updating first user
		$("#modal-" + secondUserId).click();
		$("#last-name-" + secondUserId).clear();
		$("#first-name-" + secondUserId).click();
		$("#last-name-" + secondUserId).sendKeys("firstLastName-edit");
		$("#first-name-" + secondUserId).sendKeys("firstFirstName-edit");
//
		$("#update-" + secondUserId).click();
		$("#user-" + secondUserId).shouldHave(text("firstFirstName-edit firstLastName-edit"));

	}
	@Test
	public void v4ShouldDeleteUser(){
		// Test Deleting the first user
		long firstUserId = firstUser.getId();
		$("#user-" + firstUserId).should(exist);
		$$("[data-user-display]").shouldHave(CollectionCondition.size(2));

		$("#delete-" + firstUserId).click();
		$("#user-" + firstUserId).shouldNot(exist);
		$$("[data-user-display]").shouldHave(CollectionCondition.size(1));


	}
}
