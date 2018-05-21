package com.example.usersapi;

import com.codeborne.selenide.CollectionCondition;
import com.example.usersapi.models.User;
import com.example.usersapi.repositories.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
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
public class DemoApplicationTests {
	@Autowired
	private UserRepository userRepository;

	@Before
	public void setUp() {
		userRepository.deleteAll();
	}

	@After
	public void tearDown() {
		userRepository.deleteAll();
	}

	@Test
	public void shouldAllowFullCrudFunctionalityForAUser() throws Exception {
		User firstUser = new User("Ima", "Person");

		User secondUser = new User("Someone", "Else");

		Stream.of(firstUser, secondUser)
				.forEach(user -> {
					userRepository.save(user);
				});

		System.setProperty("selenide.browser", "Chrome");
		System.setProperty("selenide.headless", "false");

		// Visit the UI in a browser
		open("http://localhost:4200");

		// There should only be two users
		$$("[data-user-display]").shouldHave(CollectionCondition.size(2));
		long firstUserId = firstUser.getId();
		$("#user-" + firstUserId).shouldHave(text(firstUser.getFirstName()+" "+firstUser.getLastName()));


		long secondUserId = secondUser.getId();
		$("#user-" + secondUserId).shouldHave(text(secondUser.getFirstName()+" "+secondUser.getLastName()));


// Visit the new user page
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

//		// test updating first user
//		$("#edit-user-" + secondUserId).click();
//		$("#edit-user-last-name").sendKeys("firstLastName-edit");
//		$("#edit-user-first-name").sendKeys("firstFirstName-edit");
//		$("#edit-user-user-name").sendKeys("firstUserName-edit");
//		$("#edit-user-submit").click();
//		$("#user-" + secondUserId + "-user-name").shouldHave(text("firstUserName-edit"));
//		$("#user-" + secondUserId + "-first-name").shouldHave(text("firstFirstName-edit"));
//		$("#user-" + secondUserId + "-last-name").shouldHave(text("firstLastName-edit"));
//
//
//		// Test Deleting the first user
//		$("#user-" + firstUserId + "-user-name").should(exist);
//		$$("[data-user-display]").shouldHave(CollectionCondition.size(3));
//
//		$("#delete-user-" + firstUserId).click();
//		$("#user-" + firstUserId).shouldNot(exist);
//		$$("[data-user-display]").shouldHave(CollectionCondition.size(2));
//
//		$("#edit-user"+firstUserId).click();

	}
}
