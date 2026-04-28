import React, { useMemo, useState } from 'react';
import { FlightProvider } from './context/FlightContext';
import Filters from './components/Filters/Filters';
import SearchBar from './components/Search/SearchBar';
import VirtualTable from './components/Table/VirtualTable';
import Loader from './components/Common/Loader';
import { useFlights } from './hooks/useFlights';
import { applyAllFilters } from './utils/filterUtils';

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const getOperationalState = (flight) => {
  if (flight.status !== 'Active') {
    return { label: 'Cancelled', badge: 'danger' };
  }

  const code = Number.parseInt(flight.id.split('-')[1], 10) % 4;
  const states = [
    { label: 'On Time', badge: 'success' },
    { label: 'Boarding', badge: 'warning' },
    { label: 'Delayed', badge: 'warning' },
    { label: 'Arrived', badge: 'info' },
  ];

  return states[code];
};

const ui = {
  page: {
    background: 'linear-gradient(180deg, #edf1f6 0%, #f7f9fc 100%)',
    height: '100vh',
    overflow: 'hidden',
  },
  sidebar: {
    background: 'linear-gradient(180deg, #0b2742 0%, #15395d 100%)',
    height: '100vh',
    borderRight: '1px solid rgba(255,255,255,0.08)',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
  },
  contentPane: {
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  brandIcon: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: '#a8cf45',
    color: '#163250',
    fontWeight: 700,
  },
  navButton: {
    borderRadius: '14px',
    padding: '0.75rem 0.9rem',
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  card: {
    borderRadius: '22px',
    border: '1px solid #e3e8ef',
    boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
  },
  darkCard: {
    borderRadius: '22px',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 18px 36px rgba(8, 22, 38, 0.22)',
    background: 'linear-gradient(180deg, #0d2944 0%, #123858 100%)',
  },
  primaryHero: {
    borderRadius: '22px',
    border: 'none',
    boxShadow: '0 18px 36px rgba(29, 78, 216, 0.20)',
    background: 'linear-gradient(135deg, #102d48 0%, #194a78 62%, #0f766e 100%)',
  },
  badgePill: {
    borderRadius: '999px',
    padding: '0.35rem 0.75rem',
    fontWeight: 700,
    fontSize: '0.72rem',
  },
  softPanel: {
    borderRadius: '18px',
    background: '#f8fafc',
    border: '1px solid #e7edf3',
  },
  upcomingCard: {
    borderRadius: '18px',
    border: '1px solid #e7edf3',
    background: '#fff',
    boxShadow: '0 8px 18px rgba(15, 23, 42, 0.04)',
  },
  routeChip: {
    borderRadius: '999px',
    padding: '0.35rem 0.8rem',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    fontWeight: 700,
    color: '#172033',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
  },
  flightCode: {
    display: 'inline-flex',
    padding: '0.3rem 0.65rem',
    borderRadius: '999px',
    background: '#edf4ff',
    color: '#1d4ed8',
    fontWeight: 700,
    fontSize: '0.76rem',
  },
  previewLine: {
    height: '2px',
    background: '#d7e0ea',
    flex: 1,
    borderRadius: '999px',
  },
};

const badgeStyles = {
  active: { background: '#edf8d3', color: '#6b8209', border: '1px solid #d8eaa0' },
  inactive: { background: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3' },
  success: { background: '#edf8d3', color: '#6b8209', border: '1px solid #d8eaa0' },
  warning: { background: '#fff3d6', color: '#a16207', border: '1px solid #fde08a' },
  info: { background: '#e0f7f3', color: '#0f766e', border: '1px solid #9fe3d4' },
  danger: { background: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3' },
};

const AppContent = () => {
  const flightContext = useFlights();
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    days: [],
    status: '',
    aoc: '',
    bodyType: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUpcomingDate, setSelectedUpcomingDate] = useState(null);

  const handleFilterChange = (filterData) => {
    setFilters((prev) => ({
      ...prev,
      [filterData.type]: filterData.value,
    }));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRowUpdate = (id, updatedData) => {
    flightContext.updateFlight(id, updatedData);
  };

  let displayedFlights = applyAllFilters(flightContext.flights, filters);

  if (searchTerm) {
    displayedFlights = displayedFlights.filter((flight) =>
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.aoc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const uniqueDateMap = new Map();
  displayedFlights.forEach((flight) => {
    if (!uniqueDateMap.has(flight.startDate)) {
      uniqueDateMap.set(flight.startDate, flight);
    }
  });
  const schedulePreview = Array.from(uniqueDateMap.values()).slice(0, 6);
  const activeUpcomingDate = selectedUpcomingDate ?? schedulePreview[0]?.startDate ?? null;

  const todayHighlightFlights = useMemo(() => (
    activeUpcomingDate
      ? displayedFlights.filter((flight) => flight.startDate === activeUpcomingDate).slice(0, 3)
      : displayedFlights.slice(0, 3)
  ), [activeUpcomingDate, displayedFlights]);

  const activeFlights = displayedFlights.filter((flight) => flight.status === 'Active').length;
  const inactiveFlights = displayedFlights.length - activeFlights;
  const wideBodyCount = displayedFlights.filter((flight) => flight.bodyType === 'wide_body').length;
  const averageTurnaround = displayedFlights.length > 0 ? Math.round((displayedFlights.length * 42) / 100) : 0;
  const narrowBodyCount = displayedFlights.length - wideBodyCount;
  const onTimeCount = displayedFlights.filter((flight) => getOperationalState(flight).label === 'On Time').length;
  const delayedCount = displayedFlights.filter((flight) => getOperationalState(flight).label === 'Delayed').length;
  const boardingCount = displayedFlights.filter((flight) => getOperationalState(flight).label === 'Boarding').length;
  const topOperator = displayedFlights.reduce((acc, flight) => {
    acc[flight.aoc] = (acc[flight.aoc] || 0) + 1;
    return acc;
  }, {});
  const leadOperator = Object.entries(topOperator).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  const dashboardModules = [
    { id: 'booking', title: 'Booking Management', value: '1,248', note: 'Confirmed bookings in current cycle' },
    { id: 'crew', title: 'Crew Management', value: '436', note: 'Pilots and cabin crew rostered' },
    { id: 'passengers', title: 'Passenger Details', value: '18,942', note: 'Passengers processed today' },
    { id: 'operations', title: 'Operations Panel', value: '64', note: 'Live operational actions monitored' },
    { id: 'reports', title: 'Reports & Analytics', value: '27', note: 'Operational reports generated this week' },
    { id: 'admin', title: 'Admin Panels', value: '9', note: 'Policy and access workflows pending' },
    { id: 'communication', title: 'Communication Module', value: '12', note: 'Alerts and dispatch threads active' },
    { id: 'documents', title: 'Document Management', value: '142', note: 'Compliance files and manuals tracked' },
  ];

  const tableColumns = [
    {
      key: 'flightNumber',
      label: 'Flight',
      render: (value, row) => (
        <div>
          <div style={ui.flightCode}>FL-{value}</div>
          <small className="text-secondary">{row.aoc} operator</small>
        </div>
      ),
    },
    {
      key: 'route',
      label: 'Route',
      render: (_, row) => (
        <div style={ui.routeChip}>
          <span>{row.origin}</span>
          <span className="text-secondary">→</span>
          <span>{row.destination}</span>
        </div>
      ),
    },
    {
      key: 'std',
      label: 'Departure',
      render: (value) => (
        <div>
          <div className="fw-semibold">{value}</div>
          <small className="text-secondary">STD</small>
        </div>
      ),
    },
    {
      key: 'sta',
      label: 'Arrival',
      render: (value) => (
        <div>
          <div className="fw-semibold">{value}</div>
          <small className="text-secondary">STA</small>
        </div>
      ),
    },
    {
      key: 'scheduleWindow',
      label: 'Schedule Window',
      render: (_, row) => (
        <div>
          <div className="fw-semibold">{formatDate(row.startDate)}</div>
          <small className="text-secondary">to {formatDate(row.endDate)}</small>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Network Status',
      render: (value) => (
        <span className="badge" style={{ ...ui.badgePill, ...(value === 'Active' ? badgeStyles.active : badgeStyles.inactive) }}>
          {value}
        </span>
      ),
    },
    {
      key: 'ops',
      label: 'Ops Signal',
      render: (_, row) => {
        const state = getOperationalState(row);
        return (
          <span className="badge" style={{ ...ui.badgePill, ...badgeStyles[state.badge] }}>
            {state.label}
          </span>
        );
      },
    },
    {
      key: 'bodyType',
      label: 'Aircraft',
      render: (value) => (
        <div>
          <div className="fw-semibold">{value === 'narrow_body' ? 'Narrow Body' : 'Wide Body'}</div>
          <small className="text-secondary">{value === 'narrow_body' ? 'Regional fleet' : 'Long-haul fleet'}</small>
        </div>
      ),
    },
    { key: 'actions', label: 'Actions' },
  ];

  const editableColumns = {
    flightNumber: { editable: true, type: 'text' },
    std: { editable: true, type: 'time' },
    sta: { editable: true, type: 'time' },
    route: { editable: false },
    scheduleWindow: { editable: false },
    ops: { editable: false },
    status: {
      editable: true,
      type: 'select',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
      ],
    },
    bodyType: {
      editable: true,
      type: 'select',
      options: [
        { value: 'narrow_body', label: 'Narrow Body' },
        { value: 'wide_body', label: 'Wide Body' },
      ],
    },
  };

  return (
    <div className="container-fluid min-vh-100" style={ui.page}>
      <div className="row h-100 flex-nowrap">
        <aside className="col-12 col-xl-2 text-white p-3 d-flex flex-column" style={ui.sidebar}>
          <div className="d-flex align-items-center gap-2 mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center fw-bold"
              style={ui.brandIcon}
            >
              ✈
            </div>
            <div>
              <h2 className="h5 mb-0">SkyCrew</h2>
              <small className="text-white-50">Flight Management Platform</small>
            </div>
          </div>

          <nav className="nav flex-column gap-2">
            {['Dashboard'].map((item, index) => (
              <button
                key={item}
                className={`btn text-start ${index === 0 ? 'btn-outline-light' : 'btn-dark border-secondary-subtle text-white'}`}
                style={ui.navButton}
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-auto d-grid gap-2 pt-4">
            <button className="btn btn-outline-light text-start" style={ui.navButton} type="button">Log out</button>
          </div>
        </aside>

        <main className="col-12 col-xl-10 p-3 p-lg-4" style={ui.contentPane}>
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
            <div>
              <span className="badge text-dark border mb-2" style={{ ...ui.badgePill, background: '#fff' }}>Airline Operations Dashboard</span>
              <h1 className="h2 mb-1">Hi, Alexander</h1>
              <p className="text-secondary mb-0">
                Monitor schedules, crew readiness, operational status, and airline activity in one place.
              </p>
            </div>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <button type="button" className="btn btn-light border rounded-circle shadow-sm" style={{ width: 42, height: 42 }}>⌕</button>
              <button type="button" className="btn btn-light border rounded-circle shadow-sm" style={{ width: 42, height: 42 }}>◌</button>
              <div className="card border-0" style={ui.card}>
                <div className="card-body py-2 px-3 d-flex align-items-center gap-2">
                  <div
                    className="rounded-circle text-white d-flex align-items-center justify-content-center fw-semibold"
                    style={{ width: 38, height: 38, background: 'linear-gradient(180deg, #d7a47d 0%, #b96d49 100%)' }}
                  >
                    AW
                  </div>
                  <div>
                    <div className="fw-semibold small">Alexander Theophilus Wainwright</div>
                    <small className="text-secondary">Flight Crew Manager</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6 col-xl-2">
              <div className="card h-100 border-0" style={ui.card}>
                <div className="card-body">
                  <small className="text-secondary d-block mb-2">Today</small>
                  <div className="h4 mb-0">{formatDate(new Date().toISOString())}</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-2">
              <div className="card h-100 border-0" style={ui.card}>
                <div className="card-body">
                  <small className="text-secondary d-block mb-2">Total crew on duty today</small>
                  <div className="h3 mb-0">75</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-2">
              <div className="card h-100 border-0" style={ui.card}>
                <div className="card-body">
                  <small className="text-secondary d-block mb-2">Total flights today</small>
                  <div className="h3 mb-0">{displayedFlights.length}</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6">
              <div className="card h-100 text-white border-0" style={ui.darkCard}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h2 className="h5 mb-1">Crew availability & status</h2>
                      <small className="text-white-50">Regional overview</small>
                    </div>
                    <span className="badge" style={{ ...ui.badgePill, ...badgeStyles.success }}>92 Total</span>
                  </div>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <div className="small mb-2">On duty: 75</div>
                      <div className="small mb-2">On leave: 10</div>
                      <div className="small mb-2">On standby: 5</div>
                      <div className="small">Sick leave: 2</div>
                    </div>
                    <div className="col-md-6">
                      <div className="progress mb-2" style={{ height: 8, background: 'rgba(255,255,255,0.12)' }}><div className="progress-bar" style={{ width: '82%', background: '#a8cf45' }} /></div>
                      <div className="progress mb-2" style={{ height: 8, background: 'rgba(255,255,255,0.12)' }}><div className="progress-bar" style={{ width: '11%', background: '#2ea8a0' }} /></div>
                      <div className="progress mb-2" style={{ height: 8, background: 'rgba(255,255,255,0.12)' }}><div className="progress-bar" style={{ width: '5%', background: '#f3c942' }} /></div>
                      <div className="progress" style={{ height: 8, background: 'rgba(255,255,255,0.12)' }}><div className="progress-bar" style={{ width: '2%', background: '#f8fafc' }} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-lg-4">
              <div className="card h-100 border-0" style={ui.card}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h5 mb-0">Flight status</h2>
                    <span className="badge text-dark border" style={{ ...ui.badgePill, background: '#fff' }}>Today</span>
                  </div>
                  <div className="display-6 fw-bold mb-2">
                    {displayedFlights.length ? Math.round((onTimeCount / displayedFlights.length) * 100) : 0}%
                    <span className="fs-6 text-secondary ms-2">On time</span>
                  </div>
                  <div className="progress mb-3" style={{ height: 8, background: '#e7edf3' }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${displayedFlights.length ? (onTimeCount / displayedFlights.length) * 100 : 0}%`,
                        background: 'linear-gradient(90deg, #a8cf45 0%, #2ea88a 100%)',
                      }}
                    />
                  </div>
                  <div className="row g-2 small text-secondary">
                    <div className="col-6 d-flex align-items-center gap-2"><span className="rounded-circle" style={{ width: 8, height: 8, background: '#a8cf45' }} />On time: {onTimeCount}</div>
                    <div className="col-6 d-flex align-items-center gap-2"><span className="rounded-circle" style={{ width: 8, height: 8, background: '#f3c942' }} />Boarding: {boardingCount}</div>
                    <div className="col-6 d-flex align-items-center gap-2"><span className="rounded-circle" style={{ width: 8, height: 8, background: '#ef8d38' }} />Delayed: {delayedCount}</div>
                    <div className="col-6 d-flex align-items-center gap-2"><span className="rounded-circle" style={{ width: 8, height: 8, background: '#cbd5e1' }} />Cancelled: {inactiveFlights}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card h-100 border-0" style={ui.card}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h5 mb-0">Incident Reports & Safety</h2>
                    <span className="badge text-dark border" style={{ ...ui.badgePill, background: '#fff' }}>This month</span>
                  </div>
                  <div className="row g-2">
                    <div className="col-4"><div className="rounded p-3" style={ui.softPanel}><div className="h4 mb-1">3</div><small className="text-secondary">Total</small></div></div>
                    <div className="col-4"><div className="rounded p-3" style={ui.softPanel}><div className="h4 mb-1">1</div><small className="text-secondary">Major</small></div></div>
                    <div className="col-4"><div className="rounded p-3" style={ui.softPanel}><div className="h4 mb-1">3</div><small className="text-secondary">Minor</small></div></div>
                  </div>
                  <p className="text-secondary small mt-3 mb-0">Monthly trend: 10% decrease from last month</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card h-100 text-white border-0" style={ui.primaryHero}>
                <div className="card-body">
                  <small className="text-uppercase text-white-50">Operations Overview</small>
                  <h2 className="h4 mt-2">Regional network is stable with controlled disruption levels.</h2>
                  <p className="text-white-50">
                    Strong departure reliability, balanced aircraft utilization, and clear operator visibility across the network.
                  </p>
                  <div className="row g-2 mt-2">
                    <div className="col-4"><div className="rounded p-2 h-100" style={{ background: 'rgba(255,255,255,0.12)' }}><div className="fw-bold">{Math.max(activeFlights - inactiveFlights, 0)}%</div><small>Stability</small></div></div>
                    <div className="col-4"><div className="rounded p-2 h-100" style={{ background: 'rgba(255,255,255,0.12)' }}><div className="fw-bold">{wideBodyCount}:{narrowBodyCount}</div><small>Fleet mix</small></div></div>
                    <div className="col-4"><div className="rounded p-2 h-100" style={{ background: 'rgba(255,255,255,0.12)' }}><div className="fw-bold">{leadOperator}</div><small>Lead AOC</small></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            {dashboardModules.map((module) => (
              <div key={module.id} className="col-12 col-md-6 col-xl-3">
                <div className="card h-100 border-0" style={ui.card}>
                  <div className="card-body">
                    <small className="text-secondary">{module.title}</small>
                    <div className="h4 mt-1 mb-1">{module.value}</div>
                    <small className="text-secondary">{module.note}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Loader isLoading={flightContext.loading} />

          {flightContext.error && <div className="alert alert-danger">{flightContext.error}</div>}

          {!flightContext.loading && !flightContext.error && (
            <>
              <div className="row g-3 mb-3">
                <div className="col-12 col-lg-4">
                  <div className="card h-100 border-0" style={ui.card}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-2">
                        <h3 className="h6 mb-0">Departure Control</h3>
                        <small className="text-secondary">Boarding and gate readiness</small>
                      </div>
                      <div className="display-6 fw-bold">53</div>
                      <p className="text-secondary small">Flights aligned with departure window</p>
                      <div className="progress" style={{ height: 8, background: '#e7edf3' }}><div className="progress-bar" style={{ width: '78%', background: 'linear-gradient(90deg, #a8cf45 0%, #2ea88a 100%)' }} /></div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="card h-100 border-0" style={ui.card}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-2">
                        <h3 className="h6 mb-0">Crew & Compliance</h3>
                        <small className="text-secondary">Roster integrity</small>
                      </div>
                      <div className="display-6 fw-bold">96%</div>
                      <p className="text-secondary small">Roster coverage across active network</p>
                      <div className="progress" style={{ height: 8, background: '#e7edf3' }}><div className="progress-bar" style={{ width: '96%', background: 'linear-gradient(90deg, #194a78 0%, #2ea8a0 100%)' }} /></div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="card h-100 border-0" style={ui.card}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-2">
                        <h3 className="h6 mb-0">Passenger Flow</h3>
                        <small className="text-secondary">Check-in and transfer status</small>
                      </div>
                      <div className="display-6 fw-bold">18.9k</div>
                      <p className="text-secondary small">Passengers processed in current period</p>
                      <div className="progress" style={{ height: 8, background: '#e7edf3' }}><div className="progress-bar" style={{ width: '68%', background: 'linear-gradient(90deg, #f3c942 0%, #ef8d38 100%)' }} /></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 mb-3" style={ui.card}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h5 mb-0">Upcoming flights</h2>
                    <button type="button" className="btn btn-light border btn-sm rounded-circle" style={{ width: 36, height: 36 }}>⌕</button>
                  </div>
                  <div className="row g-2 mb-3">
                    {schedulePreview.map((flight) => (
                      <div key={flight.id} className="col-6 col-lg-2">
                        <button
                          type="button"
                          className={`btn w-100 ${activeUpcomingDate === flight.startDate ? 'btn-outline-success' : 'btn-light border'}`}
                          onClick={() => setSelectedUpcomingDate(flight.startDate)}
                          style={{ borderRadius: '16px', padding: '0.8rem 0.6rem' }}
                        >
                          <div className="fw-semibold">{new Date(flight.startDate).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })}</div>
                          <small>{new Date(flight.startDate).toLocaleDateString('en-US', { weekday: 'short' })}</small>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="row g-3">
                    {todayHighlightFlights.map((flight) => {
                      const state = getOperationalState(flight);
                      return (
                        <div key={flight.id} className="col-12">
                          <div className="p-3 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3" style={ui.upcomingCard}>
                            <div className="fw-semibold">FL {flight.flightNumber}</div>
                            <div className="d-flex align-items-center gap-3 flex-wrap flex-grow-1 justify-content-center">
                              <div>
                                <div className="h4 mb-0 fw-bold">{flight.origin}</div>
                                <small className="text-secondary">{flight.std}</small>
                              </div>
                              <div className="d-flex align-items-center gap-2" style={{ minWidth: 160 }}>
                                <span style={ui.previewLine} />
                                <span className="text-warning">✈</span>
                                <span style={ui.previewLine} />
                              </div>
                              <div>
                                <div className="h4 mb-0 fw-bold">{flight.destination}</div>
                                <small className="text-secondary">{flight.sta}</small>
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                              <small className="text-secondary">{flight.bodyType === 'narrow_body' ? 'Regional' : 'Long-haul'}</small>
                              <span className="badge" style={{ ...ui.badgePill, ...badgeStyles[state.badge] }}>{state.label}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="card border-0 mb-3" style={ui.card}>
                <div className="card-body">
                  <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-3">
                    <div>
                      <h2 className="h5 mb-1">Flight Listing Table</h2>
                      <p className="text-secondary small mb-0">Search, filter, and update schedule records with operational context.</p>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge text-dark border" style={{ ...ui.badgePill, background: '#fff' }}>Boarding: {boardingCount}</span>
                      <span className="badge text-dark border" style={{ ...ui.badgePill, background: '#fff' }}>On Time: {onTimeCount}</span>
                      <span className="badge text-dark border" style={{ ...ui.badgePill, background: '#fff' }}>Delays: {delayedCount}</span>
                      <span className="badge text-dark border" style={{ ...ui.badgePill, background: '#fff' }}>Cancelled: {inactiveFlights}</span>
                    </div>
                  </div>
                  <SearchBar onSearch={handleSearch} />
                  <Filters onFilterChange={handleFilterChange} />
                </div>
              </div>

              <div className="card border-0" style={ui.card}>
                <div className="card-header bg-white d-flex flex-column flex-lg-row justify-content-between gap-2" style={{ borderBottom: '1px solid #e8edf3' }}>
                  <span className="small fw-semibold text-secondary">
                    Showing {displayedFlights.length} of {flightContext.flights.length} flights
                  </span>
                  <span className="small text-secondary">Enterprise view: Schedules, status, timing, and operator details</span>
                </div>
                <div className="card-body p-0">
                  <VirtualTable
                    data={displayedFlights}
                    columns={tableColumns}
                    idField="id"
                    onRowUpdate={handleRowUpdate}
                    editableColumns={editableColumns}
                    enableEdit={true}
                  />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <FlightProvider>
      <AppContent />
    </FlightProvider>
  );
}

export default App;
