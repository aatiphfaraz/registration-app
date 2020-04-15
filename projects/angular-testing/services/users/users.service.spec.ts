import { TestBed } from "@angular/core/testing";
import { UsersService } from "./users.service";
import { of } from "rxjs";

describe("UsersService", () => {
  let usersService: UsersService; // Add this

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
    });

    usersService = TestBed.get(UsersService); // Add this
  });

  it("should be created", () => {
    // Remove inject()
    expect(usersService).toBeTruthy();
  });
  describe("all", () => {
    it("should return a collection of users", () => {
      const userResponse = [
        {
          id: "1",
          name: "Jane",
          role: "Designer",
          pokemon: "Blastoise",
        },
        {
          id: "2",
          name: "Bob",
          role: "Developer",
          pokemon: "Charizard",
        },
      ];
      let response;
      spyOn(usersService, "all").and.returnValue(of(userResponse));

      usersService.all().subscribe((res) => {
        response = res;
      });

      expect(response).toEqual(userResponse);
    });
  });

  describe("findOne", () => {
    it("should return a single user", () => {
      const userResponse = {
        id: "2",
        name: "Bob",
        role: "Developer",
        pokemon: "Charizard",
      };
      let response;
      spyOn(usersService, "findOne").and.returnValue(of(userResponse));

      usersService.findOne("2").subscribe((res) => {
        response = res;
      });

      expect(response).toEqual(userResponse);
    });
  });
});
