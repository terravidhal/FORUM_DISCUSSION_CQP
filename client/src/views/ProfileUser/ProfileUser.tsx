const ProfileUser = () => {
  return (
    <div>
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <div className="md:hidden">
          <img
            alt="Forms"
            loading="lazy"
            width="1280"
            height="791"
            decoding="async"
            data-nimg="1"
            className="block dark:hidden"
            src="/_next/image?url=%2Fexamples%2Fforms-light.png&amp;w=3840&amp;q=75"
          />
          <img
            alt="Forms"
            loading="lazy"
            width="1280"
            height="791"
            decoding="async"
            data-nimg="1"
            className="hidden dark:block"
          />
        </div>
        <div className="hidden space-y-6 p-10 pb-16 md:block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <div
            data-orientation="horizontal"
            role="none"
            className="shrink-0 bg-border h-[1px] w-full my-6"
          ></div>
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                <a
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-9 px-4 py-2 bg-muted hover:bg-muted justify-start"
                  href="/examples/forms"
                >
                  Profile
                </a>
                <a
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start"
                  href="/examples/forms/account"
                >
                  Account
                </a>
                <a
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start"
                  href="/examples/forms/appearance"
                >
                  Appearance
                </a>
                <a
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start"
                  href="/examples/forms/notifications"
                >
                  Notifications
                </a>
                <a
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start"
                  href="/examples/forms/display"
                >
                  Display
                </a>
              </nav>
            </aside>
            <div className="flex-1 lg:max-w-2xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                  </p>
                </div>
                <div
                  data-orientation="horizontal"
                  role="none"
                  className="shrink-0 bg-border h-[1px] w-full"
                ></div>
                <form className="space-y-8">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor=":Ruflpukv9u6ja:-form-item"
                    >
                      Username
                    </label>
                    <input
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="shadcn"
                      id=":Ruflpukv9u6ja:-form-item"
                      aria-describedby=":Ruflpukv9u6ja:-form-item-description"
                      aria-invalid="false"
                      name="username"
                    />
                    <p
                      id=":Ruflpukv9u6ja:-form-item-description"
                      className="text-[0.8rem] text-muted-foreground"
                    >
                      This is your public display name. It can be your real name
                      or a pseudonym. You can only change this once every 30
                      days.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor=":R1eflpukv9u6ja:-form-item"
                    >
                      Email
                    </label>

                    <select aria-hidden="true">
                      <option value=""></option>
                      <option value="m@example.com">m@example.com</option>
                      <option value="m@google.com">m@google.com</option>
                      <option value="m@support.com">m@support.com</option>
                    </select>
                    <p
                      id=":R1eflpukv9u6ja:-form-item-description"
                      className="text-[0.8rem] text-muted-foreground"
                    >
                      You can manage verified email addresses in your
                      <a href="/examples/forms">email settings</a>.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor=":R1uflpukv9u6ja:-form-item"
                    >
                      Bio
                    </label>
                    <textarea
                      className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      placeholder="Tell us a little bit about yourself"
                      name="bio"
                      id=":R1uflpukv9u6ja:-form-item"
                      aria-describedby=":R1uflpukv9u6ja:-form-item-description"
                      aria-invalid="false"
                    >
                      I own a computer.
                    </textarea>
                    <p
                      id=":R1uflpukv9u6ja:-form-item-description"
                      className="text-[0.8rem] text-muted-foreground"
                    >
                      You can <span>@mention</span> other users and
                      organizations to link to them.
                    </p>
                  </div>
                  <div>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor=":Rmeflpukv9u6ja:-form-item"
                      >
                        URLs
                      </label>
                      <p
                        id=":Rmeflpukv9u6ja:-form-item-description"
                        className="text-[0.8rem] text-muted-foreground"
                      >
                        Add links to your website, blog, or social media
                        profiles.
                      </p>
                      <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        id=":Rmeflpukv9u6ja:-form-item"
                        aria-describedby=":Rmeflpukv9u6ja:-form-item-description"
                        aria-invalid="false"
                        name="urls.0.value"
                        value="https://shadcn.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                        htmlFor=":R16eflpukv9u6ja:-form-item"
                      >
                        URLs
                      </label>
                      <p
                        id=":R16eflpukv9u6ja:-form-item-description"
                        className="text-[0.8rem] text-muted-foreground sr-only"
                      >
                        Add links to your website, blog, or social media
                        profiles.
                      </p>
                      <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        id=":R16eflpukv9u6ja:-form-item"
                        aria-describedby=":R16eflpukv9u6ja:-form-item-description"
                        aria-invalid="false"
                        name="urls.1.value"
                        value="http://twitter.com/shadcn"
                      />
                    </div>
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs mt-2"
                      type="button"
                    >
                      Add URL
                    </button>
                  </div>
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    type="submit"
                  >
                    Update profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
