export const AssetTableLoading = ({ title }: { title?: string }) => (
  <>
    {/* {title && (
      <h1 className="text-xl font-bold text-darkMain dark:text-white w-full">
        {title}
      </h1>
    )} */}

    <span className="h-6 rounded bg-darkGray/50 w-20"></span>

    <section className="overflow-x-auto animate-pulse">
      <section className="min-w-max w-full  overflow-auto rounded-xl">
        <section className="flex items-center justify-between py-3 gap-3">
          <div className="flex items-center gap-3">
            <div className="h-[45px] w-[45px] rounded-full bg-darkGray/50"></div>

            <div className="flex flex-col gap-1">
              <span className="h-6 rounded bg-darkGray/50 w-32"></span>

              <span className="h-6 rounded bg-darkGray/50 w-14"></span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end gap-1">
              <span className="h-6 rounded bg-darkGray/50 w-20"></span>

              <span className="h-6 rounded bg-darkGray/50 w-14"></span>
            </div>

            {/* <span className="h-6 rounded bg-darkGray/50 w-6"></span> */}
          </div>
        </section>

        <div className="flex-grow border-t border-gray-200 dark:border-darkMain"></div>
      </section>

      <section className="min-w-max w-full  overflow-auto rounded-xl">
        <section className="flex items-center justify-between py-3 gap-3">
          <div className="flex items-center gap-3">
            <div className="h-[45px] w-[45px] rounded-full bg-darkGray/50"></div>

            <div className="flex flex-col gap-1">
              <span className="h-6 rounded bg-darkGray/50 w-32"></span>

              <span className="h-6 rounded bg-darkGray/50 w-14"></span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end gap-1">
              <span className="h-6 rounded bg-darkGray/50 w-20"></span>

              <span className="h-6 rounded bg-darkGray/50 w-14"></span>
            </div>

            {/* <span className="h-6 rounded bg-darkGray/50 w-6"></span> */}
          </div>
        </section>

        <div className="flex-grow border-t border-gray-200 dark:border-darkMain"></div>
      </section>
    </section>
  </>
);