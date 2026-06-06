import Link from "next/link";

const projects = [  
  {
    title: "ROS 2 LQR Inverted Pendulum Controller",
    description:
      "Real-time inverted pendulum control system in ROS 2 with a 3-node architecture for simulation, control, and telemetry over ROS topics. Nonlinear dynamics linearised symbolically, LQR feedback implemented at 200 Hz, real-time data logging and closed-loop analysis.",
    tags: ["ros2", "lqr", "docker", "control-systems"],
    href: "https://github.com/cyriacus73/ros_lqr",
  },
  {
    title: "Fixed-Point Neural Network on TinyML Microcontroller",
    description:
      "Quadratic regression NN deployed under severe memory, precision, and compute constraints. Q-format fixed-point arithmetic, LUT-based sigmoid activation, training and inference entirely on-chip.",
    tags: ["embedded-c", "tinyml", "q8.8"],
    href: "https://github.com/cyriacus73/grad_quad_nn",
  },
  {
    title: "LQR Control of a Nonlinear Inverted Pendulum",
    description:
      "Symbolic Jacobian computed via SymPy to linearise the cart-pendulum at the upright equilibrium. Controllability verified, LQR gains derived, and closed-loop response simulated from a disturbed initial state.",
    tags: ["lqr", "optimal-control", "scipy"],
    href: "https://github.com/cyriacus73/nonlinear-pendulum-lqr",
  },

  {
    title: "Linear Kalman Filter for Position and Velocity Estimation",
    description:
      "Kalman filter implemented from scratch on a 1D constant-velocity model. Noisy position measurements fed through full predict-update cycle to recover true position and velocity. Convergence validated from a poor initial guess.",
    tags: ["kalman-filter", "state-estimation", "numpy"],
    href: "https://github.com/cyriacus73/linear-kf-estimation",
  },
  {
    title: "Controllability Gramian and SVD Analysis",
    description:
      "Finite-horizon controllability Gramian computed via numerical integration for the linearised cart-pendulum system. SVD decomposition reveals principal controllability directions and minimum control energy per state.",
    tags: ["controllability", "gramian", "svd"],
    href: "https://github.com/cyriacus73/gramain-svd",
  },
  {
    title: "Symmetric Linear Antenna Array Optimisation",
    description:
      "Peak Side Lobe Level minimisation on an n-element array using Differential Evolution with exclusion beamwidth constraints. Performance benchmarked against published literature.",
    tags: ["differential-evolution", "optimisation", "rf"],
    href: null,
  },
  {
    title: "Rabbit Hole",
    description:
      "Graph-structured AI system for non-linear knowledge exploration. Node–thread data model with LLM inference, source-aware traversal, and full-stack persistence in Next.js and MongoDB.",
    tags: ["graph-systems", "mongodb", "next.js"],
    href: "https://findtherabbit.app",
  },
];

export default function Home() {
  return (
    <section className="py-20">
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <h1 className="font-mono text-3xl leading-snug text-text-primary">
          Hello, I&apos;m Cyriacus.
        </h1>
        <p className="mt-5 font-serif text-lg leading-8 text-text-muted">
          I write about whatever I&apos;m thinking about. Lately that&apos;s been control systems, robotics, and TinyML — but who knows what&apos;s next.
        </p>
        <div className="mt-14">
          <p className="font-mono text-2xl text-text-faint tracking-widest uppercase mb-1">
            Projects
          </p>
          <div className="border-t border-bg-border">
            {projects.map((project, i) => (
              <div key={i} className="border-b border-bg-border py-7">
                {project.href ? (
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-text-primary hover:text-accent"
                  >
                    {project.title}
                  </Link>
                ) : (
                  <span className="font-mono text-sm text-text-primary">
                    {project.title}
                  </span>
                )}
                <p className="mt-2 font-serif text-base leading-7 text-text-muted">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-accent">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <p className="font-mono text-xs text-text-faint tracking-widest uppercase mb-4">
            Currently
          </p>
          <ul className="space-y-2">
            <li className="font-serif text-base text-text-muted leading-7">
              Learning ROS2 and robotic systems programming.
            </li>
            <li className="font-serif text-base text-text-muted leading-7">
              Thinking seriously about swarm aerial robotics and distributed control.
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <Link
            href="/articles"
            className="inline-block border border-bg-border px-4 py-2 font-mono text-sm text-text-primary hover:text-accent hover:border-accent"
          >
            Read articles →
          </Link>
        </div>

      </div>
    </section>
  );
}